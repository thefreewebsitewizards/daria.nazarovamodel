# Daria Nazarova - Portfolio Website

A modern, elegant, and interactive portfolio website for NYC-based plus-size model Daria Nazarova.

## Features

- **Modern Design**: Clean, minimalistic layout with premium aesthetics
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Gallery**: Dynamic portfolio with filtering capabilities
- **Smooth Animations**: CSS and JavaScript animations for enhanced UX
- **Contact Form**: Functional contact form with validation
- **Video Header**: Support for video background in hero section
- **Modal Gallery**: Full-screen image viewing with navigation
- **Loading Screen**: Elegant loading animation
- **Smooth Scrolling**: Enhanced navigation experience

## Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
└── assets/             # Media files directory
    ├── editorial/      # Editorial photography
    ├── judging/        # Commercial & magazine work
    ├── runaway/        # Runway photography
    └── videos/         # Video files
```

## Media Files Setup

To complete the website setup, add the following media files to their respective directories:

### Required Images

**Editorial Portfolio (`assets/editorial/`):**
- `cover1.jpg` - Hero section main image
- `headshot.jpg` - About section profile photo
- `editorial1.jpg` - Editorial portfolio item
- `editorial2.jpg` - Editorial portfolio item
- `studio1.jpg` - Studio session portfolio item

**Commercial & Magazines (`assets/judging/`):**
- `magazine1.jpg` - Magazine cover work
- `campaign1.jpg` - Brand campaign work
- `beauty1.jpg` - Beauty campaign work

**Runway (`assets/runaway/`):**
- `runway1.jpg` - Fashion week runway photo
- `bridal1.jpg` - Bridal fashion week photo

**Videos (`assets/videos/`):**
- `header-video.mp4` - Hero section background video

### Image Specifications

- **Format**: JPG or PNG
- **Resolution**: Minimum 1920x1080 for hero images, 800x600 for portfolio items
- **Quality**: High quality, optimized for web
- **Aspect Ratio**: 16:9 for hero images, flexible for portfolio items

## Customization

### Colors
The website uses CSS custom properties for easy color customization:
- `--primary-color`: Main dark color (#1a1a1a)
- `--accent-color`: Gold accent color (#d4af37)
- `--secondary-color`: Light background (#f5f5f5)

### Content
Update the following in `index.html`:
- Contact email in the contact form action
- Social media links in the footer
- Bio text and statistics in the About section

### Portfolio
Add or modify portfolio items in the `portfolioData` array in `script.js`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- Lazy loading for images
- Optimized animations
- Throttled scroll events
- Preloading of critical images
- Responsive image handling

## Contact Form

The contact form includes:
- Client-side validation
- Email format validation
- Success/error notifications
- Form submission simulation (replace with actual backend)

## Deployment

1. Upload all files to your web server
2. Ensure proper file permissions
3. Add your media files to the assets directories
4. Configure contact form backend (if needed)
5. Test all functionality

## License

© 2024 Daria Nazarova. All rights reserved.