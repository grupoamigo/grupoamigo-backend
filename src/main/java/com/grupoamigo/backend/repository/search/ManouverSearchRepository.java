package com.grupoamigo.backend.repository.search;
import com.grupoamigo.backend.domain.Manouver;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Manouver} entity.
 */
public interface ManouverSearchRepository extends ElasticsearchRepository<Manouver, Long> {
}
