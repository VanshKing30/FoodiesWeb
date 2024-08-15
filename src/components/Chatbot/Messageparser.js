class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (this.containsKeywords(lowerCaseMessage, ["menu", "food", "canteen", "dining"])) {
        this.actionProvider.handleMenu();
      } else if (this.containsKeywords(lowerCaseMessage, ["order", "place order", "buy"])) {
        this.actionProvider.handleOrder();
      } else if (this.containsKeywords(lowerCaseMessage, ["delivery", "track order", "status"])) {
        this.actionProvider.handleDelivery();
      } else if (this.containsKeywords(lowerCaseMessage, ["discount", "offer", "deal"])) {
        this.actionProvider.handleDiscounts();
      } else if (this.containsKeywords(lowerCaseMessage, ["payment", "checkout", "billing"])) {
        this.actionProvider.handlePayment();
      } else if (this.containsKeywords(lowerCaseMessage, ["account", "profile", "settings"])) {
        this.actionProvider.handleAccount();
      } else if (this.containsKeywords(lowerCaseMessage, ["support", "help", "contact"])) {
        this.actionProvider.handleSupport();
      } else {
        this.actionProvider.handleUnknown();
      }
    }
  
    containsKeywords(message, keywords) {
      return keywords.some(keyword => message.includes(keyword));
    }
  }
  
  export default MessageParser;
  