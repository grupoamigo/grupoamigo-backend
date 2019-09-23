package com.grupoamigo.backend.repository.search;
import com.grupoamigo.backend.domain.ManouverRequest;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link ManouverRequest} entity.
 */
public interface ManouverRequestSearchRepository extends ElasticsearchRepository<ManouverRequest, Long> {
}
