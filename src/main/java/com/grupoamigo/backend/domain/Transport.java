package com.grupoamigo.backend.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

import com.grupoamigo.backend.domain.enumeration.TransportType;

/**
 * A Transport.
 */
@Entity
@Table(name = "transport")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "transport")
public class Transport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @NotNull
    @Column(name = "plate_id", nullable = false)
    private String plateId;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private TransportType type;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlateId() {
        return plateId;
    }

    public Transport plateId(String plateId) {
        this.plateId = plateId;
        return this;
    }

    public void setPlateId(String plateId) {
        this.plateId = plateId;
    }

    public TransportType getType() {
        return type;
    }

    public Transport type(TransportType type) {
        this.type = type;
        return this;
    }

    public void setType(TransportType type) {
        this.type = type;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Transport)) {
            return false;
        }
        return id != null && id.equals(((Transport) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Transport{" +
            "id=" + getId() +
            ", plateId='" + getPlateId() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
