package org.example.backend.repository;

import org.example.backend.model.Category;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CategoryRepository extends CrudRepository<Category,Long> {
    Optional<Category> findByName(String name);
}
