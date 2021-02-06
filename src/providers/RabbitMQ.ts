import * as Amqp from "amqp-ts";

class RabbitMQ {
    
    connection: Amqp.Connection;

    openConnection() {
        this.connection = new Amqp.Connection(process.env.RABBITMQ_URI);
    }

    initialConfig() {
        const stockExchange = this.connection.declareExchange("stock", "direct");
        this.connection.declareQueue("increment").bind(stockExchange, "incremented"); 
        this.connection.declareQueue("decrement").bind(stockExchange, "decremented");

        const orderExchange = this.connection.declareExchange("orders", "direct");
        this.connection.declareQueue("orders").bind(orderExchange, "make-order"); 

        this.connection.completeConfiguration();
    }

    consume(queueName: string, callback: Function) {

        if(!this.connection) {
            this.openConnection();
            this.initialConfig();
        }

        const queue = this.connection.declareQueue(queueName);
        const errorQueue = this.connection.declareQueue("errors");

        queue.activateConsumer(async (message: Amqp.Message) => {
            try {
                await callback(message.getContent());
                message.ack();
            } catch (e) {
                const errorContent = { payload : message.getContent(), error : e.message };
                errorQueue.send(new Amqp.Message(JSON.stringify(errorContent))); 
                message.ack();
            }
        }); 
    }
}

export default new RabbitMQ();