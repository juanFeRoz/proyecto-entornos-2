package org.example.backend.model;

import java.math.BigDecimal;
import java.util.UUID;

public class Espejo {
    private final String id;
    private String nombre;
    private double largo;
    private double ancho;
    private BigDecimal precio;

    public Espejo(String id, String nombre, double largo, double ancho, BigDecimal precio) {
        this.id = id;
        this.nombre = nombre;
        this.largo = largo;
        this.ancho = ancho;
        this.precio = precio;
    }

    public Espejo(String nombre, double largo, double ancho, BigDecimal precio) {
        this.id = UUID.randomUUID().toString();
        this.nombre = nombre;
        this.largo = largo;
        this.ancho = ancho;
        this.precio = precio;
    }

    public String getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double getLargo() {
        return largo;
    }

    public void setLargo(double largo) {
        this.largo = largo;
    }

    public double getAncho() {
        return ancho;
    }

    public void setAncho(double ancho) {
        this.ancho = ancho;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }
}
