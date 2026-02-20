package kabum.demo.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome do produto é obrigatório")
    @Size(min = 3, max = 200, message = "Nome deve ter entre 3 e 200 caracteres")
    private String name;

    @NotNull(message = "Preço é obrigatório")
    @DecimalMin(value = "0.01", message = "Preço deve ser maior que zero")
    @Digits(integer = 10, fraction = 2, message = "Preço inválido")
    private BigDecimal preco;

    @DecimalMin(value = "0.01", message = "Preço original deve ser maior que zero")
    private BigDecimal precoOriginal;

    @Min(value = 0, message = "Desconto não pode ser negativo")
    @Max(value = 100, message = "Desconto não pode ser maior que 100%")
    private Integer desconto;

    @NotNull(message = "Quantidade é obrigatória")
    @Min(value = 0, message = "Quantidade não pode ser negativa")
    private Integer quantidade;

    @NotBlank(message = "Descrição é obrigatória")
    @Size(min = 10, max = 5000)
    @Column(columnDefinition = "TEXT")
    private String descricao;

    @NotBlank(message = "URL da imagem é obrigatória")
    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    @DecimalMin(value = "0.0")
    @DecimalMax(value = "5.0")
    private Double rating;

    @Min(value = 0)
    private Integer reviews;

    @Size(max = 100)
    private String marca;

    @Size(max = 100)
    private String modelo;

    @Size(max = 100)
    private String garantia;

    @Size(max = 50)
    private String cor;

    @Size(max = 50)
    private String peso;

    @Size(max = 100)
    private String dimensoes;

    @NotEmpty(message = "Produto deve ter pelo menos uma categoria")
    @ManyToMany
    @JoinTable(
        name = "product_category",
        joinColumns = @JoinColumn(name = "product_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private java.util.List<Category> categories;
}