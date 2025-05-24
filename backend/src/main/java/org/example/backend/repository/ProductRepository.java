package org.example.backend.repository;

import org.example.backend.model.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ProductRepository extends CrudRepository<Product, Long> {
    Optional<Iterable<Product>> findByNameContains(String name);
    Optional<Product> findByName(String name);
}
