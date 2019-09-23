package com.grupoamigo.backend.repository.search;
import com.grupoamigo.backend.domain.Membership;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Membership} entity.
 */
public interface MembershipSearchRepository extends ElasticsearchRepository<Membership, Long> {
}
