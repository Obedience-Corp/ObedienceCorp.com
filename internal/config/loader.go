package config

import (
	"os"

	"gopkg.in/yaml.v3"
)

// LoadSiteConfig loads the site configuration from a YAML file
func LoadSiteConfig(path string) (*SiteConfig, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var config SiteConfig
	if err := yaml.Unmarshal(data, &config); err != nil {
		return nil, err
	}

	return &config, nil
}

// LoadArticlesConfig loads the articles configuration from a YAML file
func LoadArticlesConfig(path string) (*ArticlesConfig, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var config ArticlesConfig
	if err := yaml.Unmarshal(data, &config); err != nil {
		return nil, err
	}

	return &config, nil
}

// LoadBulletinConfig loads the bulletin board configuration from a YAML file
func LoadBulletinConfig(path string) (*BulletinConfig, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var config BulletinConfig
	if err := yaml.Unmarshal(data, &config); err != nil {
		return nil, err
	}

	return &config, nil
}
