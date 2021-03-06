package com.grupoamigo.backend.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.grupoamigo.backend.domain.enumeration.CompanyType;

/**
 * A Company.
 */
@Entity
@Table(name = "company")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "company")
public class Company implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @NotNull
    @Column(name = "legal_name", nullable = false)
    private String legalName;

    @NotNull
    @Column(name = "tax_id", nullable = false)
    private String taxId;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private CompanyType type;

    @Lob
    @Column(name = "logo")
    private byte[] logo;

    @Column(name = "logo_content_type")
    private String logoContentType;

    @OneToMany(mappedBy = "employer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Membership> memberships = new HashSet<>();

    @OneToMany(mappedBy = "companies")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Contract> contracts = new HashSet<>();

    @OneToOne(mappedBy = "owner")
    @JsonIgnore
    private Warehouse warehouse;

    @OneToOne(mappedBy = "provider")
    @JsonIgnore
    private Manouver manouver;

    @OneToMany(mappedBy = "suppliers")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Client> suppliers = new HashSet<>();

    @OneToMany(mappedBy = "clients")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Client> clients = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLegalName() {
        return legalName;
    }

    public Company legalName(String legalName) {
        this.legalName = legalName;
        return this;
    }

    public void setLegalName(String legalName) {
        this.legalName = legalName;
    }

    public String getTaxId() {
        return taxId;
    }

    public Company taxId(String taxId) {
        this.taxId = taxId;
        return this;
    }

    public void setTaxId(String taxId) {
        this.taxId = taxId;
    }

    public CompanyType getType() {
        return type;
    }

    public Company type(CompanyType type) {
        this.type = type;
        return this;
    }

    public void setType(CompanyType type) {
        this.type = type;
    }

    public byte[] getLogo() {
        return logo;
    }

    public Company logo(byte[] logo) {
        this.logo = logo;
        return this;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getLogoContentType() {
        return logoContentType;
    }

    public Company logoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
        return this;
    }

    public void setLogoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
    }

    public Set<Membership> getMemberships() {
        return memberships;
    }

    public Company memberships(Set<Membership> memberships) {
        this.memberships = memberships;
        return this;
    }

    public Company addMembership(Membership membership) {
        this.memberships.add(membership);
        membership.setEmployer(this);
        return this;
    }

    public Company removeMembership(Membership membership) {
        this.memberships.remove(membership);
        membership.setEmployer(null);
        return this;
    }

    public void setMemberships(Set<Membership> memberships) {
        this.memberships = memberships;
    }

    public Set<Contract> getContracts() {
        return contracts;
    }

    public Company contracts(Set<Contract> contracts) {
        this.contracts = contracts;
        return this;
    }

    public Company addContract(Contract contract) {
        this.contracts.add(contract);
        contract.setCompanies(this);
        return this;
    }

    public Company removeContract(Contract contract) {
        this.contracts.remove(contract);
        contract.setCompanies(null);
        return this;
    }

    public void setContracts(Set<Contract> contracts) {
        this.contracts = contracts;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public Company warehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
        return this;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    public Manouver getManouver() {
        return manouver;
    }

    public Company manouver(Manouver manouver) {
        this.manouver = manouver;
        return this;
    }

    public void setManouver(Manouver manouver) {
        this.manouver = manouver;
    }

    public Set<Client> getSuppliers() {
        return suppliers;
    }

    public Company suppliers(Set<Client> clients) {
        this.suppliers = clients;
        return this;
    }

    public Company addSupplier(Client client) {
        this.suppliers.add(client);
        client.setSuppliers(this);
        return this;
    }

    public Company removeSupplier(Client client) {
        this.suppliers.remove(client);
        client.setSuppliers(null);
        return this;
    }

    public void setSuppliers(Set<Client> clients) {
        this.suppliers = clients;
    }

    public Set<Client> getClients() {
        return clients;
    }

    public Company clients(Set<Client> clients) {
        this.clients = clients;
        return this;
    }

    public Company addClient(Client client) {
        this.clients.add(client);
        client.setClients(this);
        return this;
    }

    public Company removeClient(Client client) {
        this.clients.remove(client);
        client.setClients(null);
        return this;
    }

    public void setClients(Set<Client> clients) {
        this.clients = clients;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Company)) {
            return false;
        }
        return id != null && id.equals(((Company) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Company{" +
            "id=" + getId() +
            ", legalName='" + getLegalName() + "'" +
            ", taxId='" + getTaxId() + "'" +
            ", type='" + getType() + "'" +
            ", logo='" + getLogo() + "'" +
            ", logoContentType='" + getLogoContentType() + "'" +
            "}";
    }
}
