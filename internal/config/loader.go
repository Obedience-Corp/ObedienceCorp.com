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

// LoadDispatchConfig loads the dispatch board configuration from a YAML file
func LoadDispatchConfig(path string) (*DispatchConfig, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var config DispatchConfig
	if err := yaml.Unmarshal(data, &config); err != nil {
		return nil, err
	}

	return &config, nil
}

// LoadNavigationConfig loads the navigation menu configuration from a YAML file
func LoadNavigationConfig(path string) (*NavigationConfig, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var wrapper NavigationConfigWrapper
	if err := yaml.Unmarshal(data, &wrapper); err != nil {
		return nil, err
	}

	return &wrapper.Navigation, nil
}

// LoadPageConfig loads a page-specific configuration from a YAML file
func LoadPageConfig(path string) (*PageConfig, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var wrapper PageConfigWrapper
	if err := yaml.Unmarshal(data, &wrapper); err != nil {
		return nil, err
	}

	return &wrapper.Page, nil
}
