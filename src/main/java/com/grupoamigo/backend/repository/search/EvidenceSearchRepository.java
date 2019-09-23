package com.grupoamigo.backend.repository.search;
import com.grupoamigo.backend.domain.Evidence;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Evidence} entity.
 */
public interface EvidenceSearchRepository extends ElasticsearchRepository<Evidence, Long> {
}
