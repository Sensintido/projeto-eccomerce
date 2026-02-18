package kabum.demo.Dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequestDTO {
    private Integer userId;
    private List<ItemRequestDTO> itens;
}