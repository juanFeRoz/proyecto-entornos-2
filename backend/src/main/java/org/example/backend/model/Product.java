package org.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int price;
    private String image;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
