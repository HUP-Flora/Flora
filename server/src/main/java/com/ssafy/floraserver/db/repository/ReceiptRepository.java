package com.ssafy.floraserver.db.repository;

import com.ssafy.floraserver.db.entity.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceiptRepository extends JpaRepository<Receipt, Long> {
}
