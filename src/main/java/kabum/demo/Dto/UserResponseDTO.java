package kabum.demo.Dto;

import lombok.Data;

@Data
public class UserResponseDTO {
    private Integer id;
    private String name;
    private String email;
    private String cpf;
    private String phone;
}