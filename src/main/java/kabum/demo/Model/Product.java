package kabum.demo.Model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private BigDecimal preco;         
    private BigDecimal precoOriginal; 
    private Integer desconto;         
    private Integer quantidade;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;          

    private Double rating;            
    private Integer reviews;
    private String marca;
    private String modelo;
    private String garantia;
    private String cor;
    private String peso;
    private String dimensoes;

    @ManyToMany
    @JoinTable(
        name = "product_category", 
        joinColumns = @JoinColumn(name = "product_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private java.util.List<Category> categories;
}