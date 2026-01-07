package config

// SiteConfig holds the main site configuration
type SiteConfig struct {
	Site     Site     `yaml:"site"`
	Hero     Hero     `yaml:"hero"`
	Branding Branding `yaml:"branding"`
}

// Site holds basic site information
type Site struct {
	Name        string `yaml:"name"`
	Title       string `yaml:"title"`
	Description string `yaml:"description"`
	BaseURL     string `yaml:"base_url"`
}

// Hero holds hero section configuration
type Hero struct {
	Brand        string `yaml:"brand"`
	Descriptor   string `yaml:"descriptor"`
	Title        string `yaml:"title"`
	TaglineLine1 string `yaml:"tagline_line1"`
	TaglineLine2 string `yaml:"tagline_line2"`
	ContactEmail string `yaml:"contact_email"`
}

// Branding holds branding colors
type Branding struct {
	AccentColor      string `yaml:"accent_color"`
	BackgroundColor  string `yaml:"background_color"`
	TextColor        string `yaml:"text_color"`
	TextGray         string `yaml:"text_gray"`
}

// ArticlesConfig holds article configuration
type ArticlesConfig struct {
	Articles []Article `yaml:"articles"`
}

// Article represents a single article box
type Article struct {
	ID               string `yaml:"id"`
	Title            string `yaml:"title"`
	GridColumn       string `yaml:"grid_column"`
	GridRow          string `yaml:"grid_row"`
	ContentFile      string `yaml:"content_file"`
	ModalContentFile string `yaml:"modal_content_file"`
	Content          string `yaml:"-"` // Populated from markdown file
	ModalContent     string `yaml:"-"` // Populated from modal markdown file
}

// BulletinConfig holds bulletin board configuration
type BulletinConfig struct {
	Bulletins []Bulletin `yaml:"bulletins"`
}

// Bulletin represents a single bulletin article card
type Bulletin struct {
	Title   string `yaml:"title"`
	Source  string `yaml:"source"`
	URL     string `yaml:"url"`
	Excerpt string `yaml:"excerpt"`
	Date    string `yaml:"date"`
}

// DispatchConfig holds internal dispatch configuration
type DispatchConfig struct {
	Dispatches []Dispatch `yaml:"dispatches"`
}

// Dispatch represents a single internal dispatch card
type Dispatch struct {
	DispatchPath string `yaml:"dispatch_path"`
	Status       string `yaml:"status"`
	Title        string `yaml:"title"`
	Excerpt      string `yaml:"excerpt"`
	Date         string `yaml:"date"`
}

// NavigationConfigWrapper holds the root YAML structure for navigation
type NavigationConfigWrapper struct {
	Navigation NavigationConfig `yaml:"navigation"`
}

// NavigationConfig holds navigation menu configuration
type NavigationConfig struct {
	Items []NavItem `yaml:"items"`
}

// NavItem represents a single navigation menu item
type NavItem struct {
	Label string `yaml:"label"`
	Path  string `yaml:"path"`
	Type  string `yaml:"type"` // "internal" or "external"
}
