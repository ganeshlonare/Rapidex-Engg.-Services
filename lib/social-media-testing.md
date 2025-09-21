# Social Media Metadata Testing Guide

## Important: Update Your Environment Variables

Before testing, make sure to update your environment variables:

1. **For Production**: Update `NEXT_PUBLIC_SITE_URL` to your actual domain
   ```
   NEXT_PUBLIC_SITE_URL=https://your-actual-domain.com
   ```

2. **For Local Testing**: Use a tunneling service like ngrok
   ```bash
   # Install ngrok if you haven't already
   npm install -g ngrok
   
   # Run your Next.js app
   npm run dev
   
   # In another terminal, expose your local server
   ngrok http 3000
   
   # Use the ngrok URL as your NEXT_PUBLIC_SITE_URL
   NEXT_PUBLIC_SITE_URL=https://your-ngrok-url.ngrok.io
   ```

## Testing Your Metadata

### 1. Facebook/Meta Debugger
- URL: https://developers.facebook.com/tools/debug/
- Paste your website URL
- Click "Debug" to see how Facebook will display your content
- Use "Scrape Again" if you've made changes

### 2. Twitter Card Validator
- URL: https://cards-dev.twitter.com/validator
- Paste your website URL
- Preview how your content will appear on Twitter

### 3. LinkedIn Post Inspector
- URL: https://www.linkedin.com/post-inspector/
- Paste your website URL
- See how LinkedIn will display your shared content

### 4. WhatsApp Preview
- Simply paste your URL in WhatsApp chat to see the preview

## Common Issues and Solutions

### Issue: Only showing URL, no title/description/image
**Cause**: Social media platforms can't access localhost URLs
**Solution**: Deploy to production or use ngrok for testing

### Issue: Old metadata showing up
**Cause**: Social platforms cache metadata
**Solution**: Use the "Scrape Again" or "Refresh" buttons in debuggers

### Issue: Image not showing
**Causes**:
- Image URL is not absolute
- Image doesn't exist
- Image is too small (should be 1200x630 for optimal results)
- Image format not supported

### Issue: Wrong title/description
**Cause**: Metadata not properly configured on specific pages
**Solution**: Check page-specific metadata exports

## Optimal Image Specifications

### Open Graph Images
- **Size**: 1200x630 pixels
- **Format**: PNG or JPG
- **File size**: Under 1MB
- **Aspect ratio**: 1.91:1

### Twitter Cards
- **Size**: 1200x630 pixels (summary_large_image)
- **Format**: PNG, JPG, or WebP
- **File size**: Under 5MB

## Testing Checklist

- [ ] Title appears correctly (not just URL)
- [ ] Description is meaningful and under 160 characters
- [ ] Image displays properly
- [ ] Image is high quality and relevant
- [ ] URL is correct and absolute
- [ ] Works on Facebook
- [ ] Works on Twitter
- [ ] Works on LinkedIn
- [ ] Works on WhatsApp

## Development Tips

1. Use the MetadataDebugger component (appears in development mode)
2. Test with different page types (home, product, category)
3. Verify absolute URLs are being generated
4. Check that images exist and are accessible
5. Test after deploying to production
