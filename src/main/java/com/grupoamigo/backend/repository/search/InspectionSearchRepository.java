package com.grupoamigo.backend.repository.search;
import com.grupoamigo.backend.domain.Inspection;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Inspection} entity.
 */
public interface InspectionSearchRepository extends ElasticsearchRepository<Inspection, Long> {
}
