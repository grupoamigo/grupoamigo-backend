package com.grupoamigo.backend.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.grupoamigo.backend.domain.enumeration.LoadType;

import com.grupoamigo.backend.domain.enumeration.LoadStatusType;

/**
 * A Load.
 */
@Entity
@Table(name = "jhi_load")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "load")
public class Load implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private LoadType type;

    @NotNull
    @Column(name = "unique_id", nullable = false)
    private String uniqueId;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private LoadStatusType status;

    @OneToOne
    @JoinColumn(unique = true)
    private Warehouse warehouse;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "jhi_load_drivers",
               joinColumns = @JoinColumn(name = "load_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "drivers_id", referencedColumnName = "id"))
    private Set<Driver> drivers = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("loadLists")
    private Warehouse warehouses;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LoadType getType() {
        return type;
    }

    public Load type(LoadType type) {
        this.type = type;
        return this;
    }

    public void setType(LoadType type) {
        this.type = type;
    }

    public String getUniqueId() {
        return uniqueId;
    }

    public Load uniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
        return this;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    public String getDescription() {
        return description;
    }

    public Load description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LoadStatusType getStatus() {
        return status;
    }

    public Load status(LoadStatusType status) {
        this.status = status;
        return this;
    }

    public void setStatus(LoadStatusType status) {
        this.status = status;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public Load warehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
        return this;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    public Set<Driver> getDrivers() {
        return drivers;
    }

    public Load drivers(Set<Driver> drivers) {
        this.drivers = drivers;
        return this;
    }

    public Load addDrivers(Driver driver) {
        this.drivers.add(driver);
        driver.getLoads().add(this);
        return this;
    }

    public Load removeDrivers(Driver driver) {
        this.drivers.remove(driver);
        driver.getLoads().remove(this);
        return this;
    }

    public void setDrivers(Set<Driver> drivers) {
        this.drivers = drivers;
    }

    public Warehouse getWarehouses() {
        return warehouses;
    }

    public Load warehouses(Warehouse warehouse) {
        this.warehouses = warehouse;
        return this;
    }

    public void setWarehouses(Warehouse warehouse) {
        this.warehouses = warehouse;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Load)) {
            return false;
        }
        return id != null && id.equals(((Load) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Load{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", uniqueId='" + getUniqueId() + "'" +
            ", description='" + getDescription() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
