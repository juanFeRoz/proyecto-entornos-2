package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.exception.NotFoundException;
import org.example.backend.model.Product;
import org.example.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;

    public Iterable<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findByName(String name) {
        return productRepository
                .findByName(name)
                .orElseThrow(NotFoundException::new);
    }

    public Iterable<Product> searchByName(String name) {
        return productRepository
                .findByNameContains(name)
                .orElseThrow(NotFoundException::new);
    }
}
