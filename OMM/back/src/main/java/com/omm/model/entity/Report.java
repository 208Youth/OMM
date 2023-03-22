package com.omm.model.entity;

import com.omm.model.entity.enums.ReportCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Blob;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "report")
public class Report {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "reported_id", nullable = false)
    private Member reported;

    @JoinColumn(name = "reason")
    private String reason;

    @Lob
    @JoinColumn(name = "image")
    private Blob image;

    @JoinColumn(name = "state", nullable = false)
    private boolean state;

    @Column(name = "category", nullable = false)
    @Enumerated(EnumType.STRING)
    private ReportCategory category;
}
