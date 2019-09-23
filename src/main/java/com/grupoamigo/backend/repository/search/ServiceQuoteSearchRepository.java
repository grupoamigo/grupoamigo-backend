package com.grupoamigo.backend.repository.search;
import com.grupoamigo.backend.domain.ServiceQuote;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link ServiceQuote} entity.
 */
public interface ServiceQuoteSearchRepository extends ElasticsearchRepository<ServiceQuote, Long> {
}
