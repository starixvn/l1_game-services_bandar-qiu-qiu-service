import { Table } from "sc-game-base";
import { betChoices, botChips } from "../constants";

export default class Bot extends Table.Crons.TableGameBot {
    constructor(definition, gameData, publisher, userInfosRepository, tempBetsRepository, appConfigs) {
        super(definition, gameData, publisher, userInfosRepository, tempBetsRepository);
        this.appConfigs = appConfigs;
        this.mainOptions = Object.values(betChoices);
        this.smallTicketRatio = 70;
    }

    resetAllBotData() {
        super.resetAllBotData();
        this.resetAllBets();
    }

    resetAllBets() {
        this.allBets = {
            spade: 0,
            heart: 0,
            club: 0,
            diamond: 0,
        };

        this.smallTickets = 0;
    }

    getBetChoice(bot) {
        return this.chance.pickone(this.mainOptions);
    }

    getMaxBet(bot, choice) {
        const gameConfigs = this.gameData.gameConfigs;
        const minBet = this.getMinBet();
        const maxBetPerChoice = gameConfigs.choices_maxbet[choice];
        const botMaxBet = gameConfigs.bot_maxbet;
        const maxBet = Math.min(maxBetPerChoice, botMaxBet);
        const isSmallTicket = this.totalTickets === 0 ? true : (this.smallTickets * 100) / this.totalTickets < this.smallTicketRatio;
        const maxBetOfSmallTicket = Math.min(minBet * 50, botMaxBet * 0.3);
        return isSmallTicket ? maxBetOfSmallTicket : maxBet;
    }

    updateBotInRoomData(bot, choice, amount, balance) {
        super.updateBotInRoomData(bot, choice, amount, balance);

        this.allBets[choice] = this.allBets[choice] ? this.allBets[choice] + amount : amount;
        this.smallTickets += amount <= this.getMinBet() * 50 ? 1 : 0;
    }

    convertAmountToChip(amount) {
        const chipList = botChips.filter((chip) => amount / chip >= 1);

        return chipList.length > 0 ? chipList[0] : this.getMinBet();
    }

    getBotsToBet() {
        const maxTickets = Math.floor(Object.keys(this.botsInRoom).length / this.gameData.remainingTime) + 5;
        const numberBotsToBet = this.chance.integer({ min: 5, max: maxTickets });

        let botsToBet = Object.values(this.botsInRoom).filter(
            (t) => t.totalBet < this.gameData.gameConfigs.bot_maxbet && t.remainTickets > 0
        );

        botsToBet = this.chance.shuffle(botsToBet);

        return botsToBet.slice(0, Math.min(numberBotsToBet, botsToBet.length));
    }

    shouldAddBot(random) {
        return random === this.inOutValues.in && Object.keys(this.botsInRoom).length < this.maxNumberOfBots;
    }
}
