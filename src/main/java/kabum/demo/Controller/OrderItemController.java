package kabum.demo.Controller;

import kabum.demo.Model.OrderItem;
import kabum.demo.Service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedido-itens")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;

    @PostMapping
    public OrderItem adicionarItem(@RequestBody OrderItem item) {
        return orderItemService.adicionarItem(item);
    }

    @GetMapping("/pedido/{orderId}")
    public List<OrderItem> listarPorPedido(@PathVariable Integer orderId) {
        return orderItemService.listarPorPedido(orderId);
    }
}