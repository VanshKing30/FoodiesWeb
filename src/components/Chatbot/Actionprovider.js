class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    handleMenu = () => {
      const message = this.createChatBotMessage("You can explore our canteen menus with various food options tailored to your taste. Would you like to see today's menu?");
      this.updateChatbotState(message);
    };
  
    handleOrder = () => {
      const message = this.createChatBotMessage("You can place an order directly from the menu. Let me guide you through the process.");
      this.updateChatbotState(message);
    };
  
    handleDelivery = () => {
      const message = this.createChatBotMessage("You can track your order status in real-time. Would you like to check your current order?");
      this.updateChatbotState(message);
    };
  
    handleDiscounts = () => {
      const message = this.createChatBotMessage("We have special offers available today! Want to hear about them?");
      this.updateChatbotState(message);
    };
  
    handlePayment = () => {
      const message = this.createChatBotMessage("We accept multiple payment methods. Need help with the checkout process?");
      this.updateChatbotState(message);
    };
  
    handleAccount = () => {
      const message = this.createChatBotMessage("You can manage your account settings or update your profile. Need assistance with something?");
      this.updateChatbotState(message);
    };
  
    handleSupport = () => {
      const message = this.createChatBotMessage("If you need any help, our support team is here for you. How can I assist you?");
      this.updateChatbotState(message);
    };
  
    handleUnknown = () => {
      const message = this.createChatBotMessage("I'm sorry, I didn't understand that. Could you please rephrase?");
      this.updateChatbotState(message);
    };
  
    updateChatbotState(message) {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }
  }
  
  export default ActionProvider;
  