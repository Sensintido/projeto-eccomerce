package kabum.demo.Service;

import kabum.demo.Model.Order;
import kabum.demo.Model.OrderItem;
import kabum.demo.Model.Product;
import kabum.demo.Repository.OrderItemRepository;
import kabum.demo.Repository.OrderRepository;
import kabum.demo.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductRepository productRepository;

@Autowired
    private OrderRepository orderRepository;

    @Transactional
    public OrderItem adicionarItem(OrderItem item) {

        Product product = productRepository.findById(item.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado!"));


        if (product.getQuantidade() < item.getQuantity()) {
            throw new RuntimeException("Estoque insuficiente! Disponível: " + product.getQuantidade());
        }


        product.setQuantidade(product.getQuantidade() - item.getQuantity());
        productRepository.save(product);


        item.setPriceAtPurchase(product.getPreco());


        OrderItem salvo = orderItemRepository.save(item);


        Order order = orderRepository.findById(item.getOrder().getId())
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado!"));


        if (order.getValorTotal() == null) {
            order.setValorTotal(BigDecimal.ZERO);
        }

        BigDecimal valorDoItem = item.getPriceAtPurchase().multiply(new BigDecimal(item.getQuantity()));
        order.setValorTotal(order.getValorTotal().add(valorDoItem));

        orderRepository.save(order);

        return salvo;
    }

    public List<OrderItem> listarPorPedido(Integer orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }
}