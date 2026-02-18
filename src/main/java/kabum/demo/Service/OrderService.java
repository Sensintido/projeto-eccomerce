package kabum.demo.Service;

import kabum.demo.Model.Order;
import kabum.demo.Model.OrderStatus;
import kabum.demo.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Order criarPedido(Order order) {

        order.setDataPedido(LocalDateTime.now());

        order.setStatus(OrderStatus.AGUARDANDO_PAGAMENTO);

        return orderRepository.save(order);
    }

    public List<Order> listarTodos() {
        return orderRepository.findAll();
    }

    public List<Order> buscarPorUsuario(Integer userId) {
        return orderRepository.findByUserId(userId);
    }
}