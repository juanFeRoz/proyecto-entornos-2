package org.example.backend.dto;

import lombok.Data;
import org.example.backend.model.Product;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
public class ShoppingCartDto {
    private Map<Product, Integer> products;
    private BigDecimal total;
}
