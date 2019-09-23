package com.grupoamigo.backend.repository.search;
import com.grupoamigo.backend.domain.CountryCode;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link CountryCode} entity.
 */
public interface CountryCodeSearchRepository extends ElasticsearchRepository<CountryCode, Long> {
}
