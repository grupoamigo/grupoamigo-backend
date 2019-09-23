package com.grupoamigo.backend.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;

import com.grupoamigo.backend.domain.enumeration.MembershipRole;

import com.grupoamigo.backend.domain.enumeration.MembershipLevelType;

/**
 * A Membership.
 */
@Entity
@Table(name = "membership")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "membership")
public class Membership implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private MembershipRole role;

    @Column(name = "created")
    private Instant created;

    @Column(name = "expires")
    private LocalDate expires;

    @Enumerated(EnumType.STRING)
    @Column(name = "account_level")
    private MembershipLevelType accountLevel;

    @ManyToOne
    @JsonIgnoreProperties("memberships")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("memberships")
    private Company employer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MembershipRole getRole() {
        return role;
    }

    public Membership role(MembershipRole role) {
        this.role = role;
        return this;
    }

    public void setRole(MembershipRole role) {
        this.role = role;
    }

    public Instant getCreated() {
        return created;
    }

    public Membership created(Instant created) {
        this.created = created;
        return this;
    }

    public void setCreated(Instant created) {
        this.created = created;
    }

    public LocalDate getExpires() {
        return expires;
    }

    public Membership expires(LocalDate expires) {
        this.expires = expires;
        return this;
    }

    public void setExpires(LocalDate expires) {
        this.expires = expires;
    }

    public MembershipLevelType getAccountLevel() {
        return accountLevel;
    }

    public Membership accountLevel(MembershipLevelType accountLevel) {
        this.accountLevel = accountLevel;
        return this;
    }

    public void setAccountLevel(MembershipLevelType accountLevel) {
        this.accountLevel = accountLevel;
    }

    public User getUser() {
        return user;
    }

    public Membership user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Company getEmployer() {
        return employer;
    }

    public Membership employer(Company company) {
        this.employer = company;
        return this;
    }

    public void setEmployer(Company company) {
        this.employer = company;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Membership)) {
            return false;
        }
        return id != null && id.equals(((Membership) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Membership{" +
            "id=" + getId() +
            ", role='" + getRole() + "'" +
            ", created='" + getCreated() + "'" +
            ", expires='" + getExpires() + "'" +
            ", accountLevel='" + getAccountLevel() + "'" +
            "}";
    }
}
