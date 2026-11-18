-- Ripples curriculum schema. Loads before seed.sql (alphabetical order).
-- Every text has an English, German and Polish column.
SET NAMES utf8mb4;

CREATE TABLE curriculum_groups (
  id         VARCHAR(64) PRIMARY KEY,
  position   INT NOT NULL UNIQUE,
  title_en   VARCHAR(255) NOT NULL,
  title_de   VARCHAR(255) NOT NULL,
  title_pl   VARCHAR(255) NOT NULL
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- position is the lesson order used by the map and the save code. Only append new lessons at the end.
CREATE TABLE lessons (
  id             VARCHAR(64) PRIMARY KEY,
  position       INT NOT NULL UNIQUE,
  group_id       VARCHAR(64) NOT NULL,
  group_position INT NOT NULL,
  title_en       VARCHAR(255) NOT NULL,
  title_de       VARCHAR(255) NOT NULL,
  title_pl       VARCHAR(255) NOT NULL,
  UNIQUE KEY lessons_group_order (group_id, group_position),
  FOREIGN KEY (group_id) REFERENCES curriculum_groups (id)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE fact_claims (
  lesson_id VARCHAR(64) NOT NULL,
  position  INT NOT NULL,
  text_en   TEXT NOT NULL,
  text_de   TEXT NOT NULL,
  text_pl   TEXT NOT NULL,
  source    VARCHAR(512) NOT NULL,
  PRIMARY KEY (lesson_id, position),
  FOREIGN KEY (lesson_id) REFERENCES lessons (id)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE fact_simplified (
  lesson_id VARCHAR(64) NOT NULL,
  position  INT NOT NULL,
  text_en   TEXT NOT NULL,
  text_de   TEXT NOT NULL,
  text_pl   TEXT NOT NULL,
  PRIMARY KEY (lesson_id, position),
  FOREIGN KEY (lesson_id) REFERENCES lessons (id)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE timeline_eras (
  id             VARCHAR(64) PRIMARY KEY,
  position       INT NOT NULL UNIQUE,
  label_en       VARCHAR(255) NOT NULL,
  label_de       VARCHAR(255) NOT NULL,
  label_pl       VARCHAR(255) NOT NULL,
  date_range_en  VARCHAR(255) NOT NULL,
  date_range_de  VARCHAR(255) NOT NULL,
  date_range_pl  VARCHAR(255) NOT NULL,
  description_en TEXT NOT NULL,
  description_de TEXT NOT NULL,
  description_pl TEXT NOT NULL
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE timeline_regions (
  id       VARCHAR(64) PRIMARY KEY,
  position INT NOT NULL UNIQUE
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE timeline_events (
  id         VARCHAR(64) PRIMARY KEY,
  position   INT NOT NULL UNIQUE,
  era_id     VARCHAR(64) NOT NULL,
  region_id  VARCHAR(64) NOT NULL,
  year_en    VARCHAR(64) NOT NULL,
  year_de    VARCHAR(64) NOT NULL,
  year_pl    VARCHAR(64) NOT NULL,
  title_en   VARCHAR(255) NOT NULL,
  title_de   VARCHAR(255) NOT NULL,
  title_pl   VARCHAR(255) NOT NULL,
  summary_en TEXT NOT NULL,
  summary_de TEXT NOT NULL,
  summary_pl TEXT NOT NULL,
  lesson_id  VARCHAR(64) NULL,
  key_figure VARCHAR(255) NULL,
  source     VARCHAR(512) NULL,
  FOREIGN KEY (era_id) REFERENCES timeline_eras (id),
  FOREIGN KEY (region_id) REFERENCES timeline_regions (id),
  FOREIGN KEY (lesson_id) REFERENCES lessons (id)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- "Meanwhile around the world" card shown at the end of a history lesson.
CREATE TABLE meanwhile (
  lesson_id VARCHAR(64) PRIMARY KEY,
  year_from INT NOT NULL,
  year_to   INT NOT NULL,
  text_en   TEXT NOT NULL,
  text_de   TEXT NOT NULL,
  text_pl   TEXT NOT NULL,
  FOREIGN KEY (lesson_id) REFERENCES lessons (id)
) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
