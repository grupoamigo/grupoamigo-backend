package com.grupoamigo.backend.repository.search;
import com.grupoamigo.backend.domain.Damage;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Damage} entity.
 */
public interface DamageSearchRepository extends ElasticsearchRepository<Damage, Long> {
}
