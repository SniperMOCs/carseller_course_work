package ru.smw.seller.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import ru.smw.seller.model.enums.AdStatus;
import ru.smw.seller.model.enums.FuelType;
import ru.smw.seller.model.enums.GearboxType;
import ru.smw.seller.model.enums.SteeringPlacement;

@Entity
@Data
@Table(name = "advertisement")
public class Advertisement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name="car_id", nullable = false)
    private Car car;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private Integer mileage;

    @Column(nullable = false)
    private Integer enginePower;

    @Column(name="engine_CC", nullable = false)
    private Double engineCC;

    @Column(nullable = false)
    private String color;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SteeringPlacement steeringPlacement;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GearboxType gearbox;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AdStatus status;

    @ManyToOne
    @JoinColumn(name = "publisher_id", nullable = false)
    private User publisher;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime soldAt = null;

    @Column(nullable = false)
    private String chassisNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)   
    private FuelType fuelType;

    @OneToMany(mappedBy = "ad", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Photo> photos = new ArrayList<>();

    @Column(nullable = false)
    private String description;
}
