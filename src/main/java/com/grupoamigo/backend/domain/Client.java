package com.grupoamigo.backend.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;

import com.grupoamigo.backend.domain.enumeration.ClientStatusType;

/**
 * A Client.
 */
@Entity
@Table(name = "client")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "client")
public class Client implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Type(type = "uuid-char")
    @Column(name = "unique_id", length = 36)
    private UUID uniqueId;

    @Column(name = "member_since")
    private Instant memberSince;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ClientStatusType status;

    @Column(name = "internal_notes")
    private String internalNotes;

    @ManyToOne
    @JsonIgnoreProperties("suppliers")
    private Company suppliers;

    @ManyToOne
    @JsonIgnoreProperties("clients")
    private Company clients;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UUID getUniqueId() {
        return uniqueId;
    }

    public Client uniqueId(UUID uniqueId) {
        this.uniqueId = uniqueId;
        return this;
    }

    public void setUniqueId(UUID uniqueId) {
        this.uniqueId = uniqueId;
    }

    public Instant getMemberSince() {
        return memberSince;
    }

    public Client memberSince(Instant memberSince) {
        this.memberSince = memberSince;
        return this;
    }

    public void setMemberSince(Instant memberSince) {
        this.memberSince = memberSince;
    }

    public ClientStatusType getStatus() {
        return status;
    }

    public Client status(ClientStatusType status) {
        this.status = status;
        return this;
    }

    public void setStatus(ClientStatusType status) {
        this.status = status;
    }

    public String getInternalNotes() {
        return internalNotes;
    }

    public Client internalNotes(String internalNotes) {
        this.internalNotes = internalNotes;
        return this;
    }

    public void setInternalNotes(String internalNotes) {
        this.internalNotes = internalNotes;
    }

    public Company getSuppliers() {
        return suppliers;
    }

    public Client suppliers(Company company) {
        this.suppliers = company;
        return this;
    }

    public void setSuppliers(Company company) {
        this.suppliers = company;
    }

    public Company getClients() {
        return clients;
    }

    public Client clients(Company company) {
        this.clients = company;
        return this;
    }

    public void setClients(Company company) {
        this.clients = company;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Client)) {
            return false;
        }
        return id != null && id.equals(((Client) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Client{" +
            "id=" + getId() +
            ", uniqueId='" + getUniqueId() + "'" +
            ", memberSince='" + getMemberSince() + "'" +
            ", status='" + getStatus() + "'" +
            ", internalNotes='" + getInternalNotes() + "'" +
            "}";
    }
}
