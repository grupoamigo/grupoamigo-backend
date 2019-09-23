package com.grupoamigo.backend.repository.search;
import com.grupoamigo.backend.domain.Load;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Load} entity.
 */
public interface LoadSearchRepository extends ElasticsearchRepository<Load, Long> {
}
