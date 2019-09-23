package com.grupoamigo.backend.repository.search;
import com.grupoamigo.backend.domain.StateCode;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link StateCode} entity.
 */
public interface StateCodeSearchRepository extends ElasticsearchRepository<StateCode, Long> {
}
