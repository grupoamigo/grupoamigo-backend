package com.grupoamigo.backend.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

import com.grupoamigo.backend.domain.enumeration.DivisionType;

/**
 * A Warehouse.
 */
@Entity
@Table(name = "warehouse")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "warehouse")
public class Warehouse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "division", nullable = false)
    private DivisionType division;

    @OneToOne
    @JoinColumn(unique = true)
    private Company owner;

    @OneToOne(mappedBy = "warehouse")
    @JsonIgnore
    private Load load;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Warehouse name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public DivisionType getDivision() {
        return division;
    }

    public Warehouse division(DivisionType division) {
        this.division = division;
        return this;
    }

    public void setDivision(DivisionType division) {
        this.division = division;
    }

    public Company getOwner() {
        return owner;
    }

    public Warehouse owner(Company company) {
        this.owner = company;
        return this;
    }

    public void setOwner(Company company) {
        this.owner = company;
    }

    public Load getLoad() {
        return load;
    }

    public Warehouse load(Load load) {
        this.load = load;
        return this;
    }

    public void setLoad(Load load) {
        this.load = load;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Warehouse)) {
            return false;
        }
        return id != null && id.equals(((Warehouse) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Warehouse{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", division='" + getDivision() + "'" +
            "}";
    }
}
