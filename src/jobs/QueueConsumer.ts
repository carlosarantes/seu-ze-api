import RabbitMQ from "../providers/RabbitMQ";
import ProductService from "../services/ProductService";

class QueueConsumer {
    startConsuming() {
        this.consumeIncrement();
        this.consumeDecrement();
    }

    consumeIncrement() {
        RabbitMQ.consume("increment", ProductService.incrementQtt);
    }

    consumeDecrement() {
        RabbitMQ.consume("decrement", ProductService.decrementQtt);
    }
}

export default new QueueConsumer();