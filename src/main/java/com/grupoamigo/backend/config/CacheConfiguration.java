package com.grupoamigo.backend.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.grupoamigo.backend.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.grupoamigo.backend.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.grupoamigo.backend.domain.User.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.Authority.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.User.class.getName() + ".authorities");
            createCache(cm, com.grupoamigo.backend.domain.Company.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.Company.class.getName() + ".services");
            createCache(cm, com.grupoamigo.backend.domain.Company.class.getName() + ".contactCards");
            createCache(cm, com.grupoamigo.backend.domain.Company.class.getName() + ".locations");
            createCache(cm, com.grupoamigo.backend.domain.Company.class.getName() + ".manouvers");
            createCache(cm, com.grupoamigo.backend.domain.Company.class.getName() + ".contracts");
            createCache(cm, com.grupoamigo.backend.domain.Company.class.getName() + ".transports");
            createCache(cm, com.grupoamigo.backend.domain.Company.class.getName() + ".transportOwners");
            createCache(cm, com.grupoamigo.backend.domain.Company.class.getName() + ".clientSuppliers");
            createCache(cm, com.grupoamigo.backend.domain.Company.class.getName() + ".clientProviders");
            createCache(cm, com.grupoamigo.backend.domain.Company.class.getName() + ".drivers");
            createCache(cm, com.grupoamigo.backend.domain.Membership.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.Client.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.Client.class.getName() + ".contactCards");
            createCache(cm, com.grupoamigo.backend.domain.Client.class.getName() + ".locations");
            createCache(cm, com.grupoamigo.backend.domain.Client.class.getName() + ".serviceQuotes");
            createCache(cm, com.grupoamigo.backend.domain.Client.class.getName() + ".contracts");
            createCache(cm, com.grupoamigo.backend.domain.Client.class.getName() + ".manouverRequestClients");
            createCache(cm, com.grupoamigo.backend.domain.Client.class.getName() + ".loads");
            createCache(cm, com.grupoamigo.backend.domain.Manouver.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.Manouver.class.getName() + ".companies");
            createCache(cm, com.grupoamigo.backend.domain.Manouver.class.getName() + ".services");
            createCache(cm, com.grupoamigo.backend.domain.Manouver.class.getName() + ".serviceQuotes");
            createCache(cm, com.grupoamigo.backend.domain.ManouverRequest.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.ManouverRequest.class.getName() + ".loads");
            createCache(cm, com.grupoamigo.backend.domain.Load.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.Load.class.getName() + ".drivers");
            createCache(cm, com.grupoamigo.backend.domain.Load.class.getName() + ".damages");
            createCache(cm, com.grupoamigo.backend.domain.Load.class.getName() + ".inspections");
            createCache(cm, com.grupoamigo.backend.domain.Load.class.getName() + ".transports");
            createCache(cm, com.grupoamigo.backend.domain.Load.class.getName() + ".manouverRequests");
            createCache(cm, com.grupoamigo.backend.domain.Load.class.getName() + ".warehouses");
            createCache(cm, com.grupoamigo.backend.domain.Seal.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.Seal.class.getName() + ".loadSeals");
            createCache(cm, com.grupoamigo.backend.domain.ExtraField.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.Location.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.Location.class.getName() + ".clients");
            createCache(cm, com.grupoamigo.backend.domain.Location.class.getName() + ".companies");
            createCache(cm, com.grupoamigo.backend.domain.Location.class.getName() + ".routes");
            createCache(cm, com.grupoamigo.backend.domain.CountryCode.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.StateCode.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.ContactCard.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.ContactCard.class.getName() + ".clients");
            createCache(cm, com.grupoamigo.backend.domain.ContactCard.class.getName() + ".companies");
            createCache(cm, com.grupoamigo.backend.domain.Service.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.Service.class.getName() + ".manouvers");
            createCache(cm, com.grupoamigo.backend.domain.Service.class.getName() + ".contracts");
            createCache(cm, com.grupoamigo.backend.domain.Service.class.getName() + ".companies");
            createCache(cm, com.grupoamigo.backend.domain.Service.class.getName() + ".serviceRequests");
            createCache(cm, com.grupoamigo.backend.domain.ServiceQuote.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.ServiceQuote.class.getName() + ".manouvers");
            createCache(cm, com.grupoamigo.backend.domain.ServiceQuote.class.getName() + ".clients");
            createCache(cm, com.grupoamigo.backend.domain.ServiceRequest.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.ServiceRequest.class.getName() + ".serviceQuotes");
            createCache(cm, com.grupoamigo.backend.domain.ServiceRequest.class.getName() + ".services");
            createCache(cm, com.grupoamigo.backend.domain.Contract.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.Contract.class.getName() + ".services");
            createCache(cm, com.grupoamigo.backend.domain.Contract.class.getName() + ".clients");
            createCache(cm, com.grupoamigo.backend.domain.Contract.class.getName() + ".suppliers");
            createCache(cm, com.grupoamigo.backend.domain.Inspection.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.Inspection.class.getName() + ".loads");
            createCache(cm, com.grupoamigo.backend.domain.Evidence.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.Evidence.class.getName() + ".damages");
            createCache(cm, com.grupoamigo.backend.domain.Damage.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.Damage.class.getName() + ".evidences");
            createCache(cm, com.grupoamigo.backend.domain.Damage.class.getName() + ".loads");
            createCache(cm, com.grupoamigo.backend.domain.Driver.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.Driver.class.getName() + ".clients");
            createCache(cm, com.grupoamigo.backend.domain.Driver.class.getName() + ".routes");
            createCache(cm, com.grupoamigo.backend.domain.Driver.class.getName() + ".loads");
            createCache(cm, com.grupoamigo.backend.domain.Driver.class.getName() + ".transports");
            createCache(cm, com.grupoamigo.backend.domain.Transport.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.Transport.class.getName() + ".drivers");
            createCache(cm, com.grupoamigo.backend.domain.Transport.class.getName() + ".owners");
            createCache(cm, com.grupoamigo.backend.domain.Transport.class.getName() + ".loads");
            createCache(cm, com.grupoamigo.backend.domain.Warehouse.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.Warehouse.class.getName() + ".loads");
            createCache(cm, com.grupoamigo.backend.domain.Route.class.getName());
            createCache(cm, com.grupoamigo.backend.domain.Route.class.getName() + ".locations");
            createCache(cm, com.grupoamigo.backend.domain.Route.class.getName() + ".drivers");
            createCache(cm, com.grupoamigo.backend.domain.Warehouse.class.getName() + ".loadLists");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
