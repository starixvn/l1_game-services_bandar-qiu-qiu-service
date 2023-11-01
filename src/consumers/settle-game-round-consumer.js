import { Table } from "sc-game-base";
import { oddsMapper, settlementResultMapper } from "../constants";
import { calculateHand } from "../helpers/hand-helper";

export default class SettleGameRoundConsumer extends Table.EventConsumers.TableSettleGameRoundConsumer {
    generateResult() {
        const dominoes = super.generateResult();
        return {
            banker: calculateHand(dominoes.slice(0, 4)),
            spade: calculateHand(dominoes.slice(4, 8)),
            heart: calculateHand(dominoes.slice(8, 12)),
            club: calculateHand(dominoes.slice(12, 16)),
            diamond: calculateHand(dominoes.slice(16, 20)),
        };
    }

    async settleBets({ result, settlementResult, roundId, time }) {
        const bets = await this.queryBets(roundId);

        if (bets?.length) {
            const { odds } = this.gameData.gameConfigs;

            await Promise.all(
                bets.map(async (bet) => {
                    const betResult = this.calculateBetResult(settlementResult, bet, odds, result);

                    bet.betwin = betResult.totalWin;
                    bet.paid = true;

                    await bet.save();
                    await this.callEndGame(bet, roundId, time, betResult);

                    this.captureBetResult(bet.uid, betResult, bet.rate);
                    await this.userBetResultPublisher.publish(bet.uid, betResult);
                })
            );
        }
    }

    calculateBetResult(settlementResult, bet, odds, roundResult) {
        const { choices } = this.definition;

        const betResult = Object.entries(settlementResult)
            .filter(([choice, win]) => choices.includes(choice))
            .reduce(
                (result, [choice, win]) => {
                    const betAmount = bet[choice] ?? 0;

                    if (win === settlementResultMapper.tie) {
                        result.totalBetAmount += betAmount;
                        result.totalWin += betAmount;
                        result.winningByChoices[choice] = bet[choice] ?? 0;
                    } else {
                        const originalOdds = odds[oddsMapper[roundResult[choice]?.handRankingId]] || 1;
                        const winAmount = win === settlementResultMapper.win ? betAmount * originalOdds : 0;

                        result.totalBetAmount += betAmount;
                        result.totalWin += winAmount;
                        result.winningByChoices[choice] = winAmount;

                        if (winAmount > 0) {
                            result.netWin += winAmount - betAmount;
                        } else {
                            result.totalLost += betAmount;
                        }
                    }

                    return result;
                },
                {
                    totalBetAmount: 0,
                    totalWin: 0,
                    netWin: 0,
                    totalLost: 0,
                    winningByChoices: {},
                }
            );

        betResult.totalWin = parseFloat(betResult.totalWin.toFixed(2));
        betResult.netWin = parseFloat(betResult.netWin.toFixed(2));

        return betResult;
    }
}
