package com.grupoamigo.backend.repository.search;
import com.grupoamigo.backend.domain.Transport;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Transport} entity.
 */
public interface TransportSearchRepository extends ElasticsearchRepository<Transport, Long> {
}
