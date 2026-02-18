package kabum.demo.Controller;

import kabum.demo.Model.Order;
import kabum.demo.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public Order realizarPedido(@RequestBody Order order) {
        return orderService.criarPedido(order);
    }

    @GetMapping
    public List<Order> listarTodos() {
        return orderService.listarTodos();
    }

    @GetMapping("/usuario/{userId}")
    public List<Order> listarPorUsuario(@PathVariable Integer userId) {
        return orderService.buscarPorUsuario(userId);
    }
}