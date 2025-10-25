# Social Media Links Setup Guide

## 📍 Location
The social media links are located in: `src/pages/ExportPage.jsx`

## 🔧 How to Update Your Links

Find the `socialLinks` array in the ExportPage component (around line 30) and update the URLs:

```javascript
const socialLinks = [
  {
    name: "Twitter/X",
    icon: Twitter,
    url: "https://twitter.com/yourhandle",  // ← UPDATE THIS
    color: "hover:bg-black hover:text-white",
    bgColor: "bg-black/5"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/yourprofile",  // ← UPDATE THIS
    color: "hover:bg-[#0A66C2] hover:text-white",
    bgColor: "bg-[#0A66C2]/5"
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/yourusername",  // ← UPDATE THIS
    color: "hover:bg-gray-800 hover:text-white",
    bgColor: "bg-gray-800/5"
  },
  {
    name: "Website",
    icon: Globe,
    url: "https://yourwebsite.com",  // ← UPDATE THIS
    color: "hover:bg-purple-600 hover:text-white",
    bgColor: "bg-purple-600/5"
  },
  {
    name: "DevPost",
    icon: Trophy,
    url: "https://devpost.com/yourprofile",  // ← UPDATE THIS
    color: "hover:bg-blue-600 hover:text-white",
    bgColor: "bg-blue-600/5"
  },
  {
    name: "Discord",
    icon: MessageCircle,
    url: "https://discord.gg/yourinvite",  // ← UPDATE THIS
    color: "hover:bg-[#5865F2] hover:text-white",
    bgColor: "bg-[#5865F2]/5"
  }
]
```

## 🎨 Customization Options

### Add More Social Links
You can add more platforms by adding new objects to the array:

```javascript
{
  name: "Reddit",
  icon: MessageCircle,  // Use any Lucide icon
  url: "https://reddit.com/u/yourusername",
  color: "hover:bg-orange-600 hover:text-white",
  bgColor: "bg-orange-600/5"
}
```

### Remove Social Links
Simply delete the entire object for the platform you don't want to show.

### Change Colors
Update the `color` and `bgColor` properties:
- `color`: Hover state colors
- `bgColor`: Default background color (use /5 for 5% opacity)

## 🎯 Example: Complete Setup

```javascript
const socialLinks = [
  {
    name: "Twitter/X",
    icon: Twitter,
    url: "https://twitter.com/johndoe",
    color: "hover:bg-black hover:text-white",
    bgColor: "bg-black/5"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/john-doe-dev",
    color: "hover:bg-[#0A66C2] hover:text-white",
    bgColor: "bg-[#0A66C2]/5"
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/johndoe",
    color: "hover:bg-gray-800 hover:text-white",
    bgColor: "bg-gray-800/5"
  },
  {
    name: "Portfolio",
    icon: Globe,
    url: "https://johndoe.dev",
    color: "hover:bg-purple-600 hover:text-white",
    bgColor: "bg-purple-600/5"
  },
  {
    name: "DevPost",
    icon: Trophy,
    url: "https://devpost.com/johndoe",
    color: "hover:bg-blue-600 hover:text-white",
    bgColor: "bg-blue-600/5"
  },
  {
    name: "Discord",
    icon: MessageCircle,
    url: "https://discord.gg/abc123",
    color: "hover:bg-[#5865F2] hover:text-white",
    bgColor: "bg-[#5865F2]/5"
  }
]
```

## 📝 Notes

- All links open in a new tab (`target="_blank"`)
- Links have `rel="noopener noreferrer"` for security
- Icons are from Lucide React library
- Grid layout automatically adjusts for mobile
- Hover effects include scale animation

## 🚀 After Updating

1. Save the file
2. The changes will be reflected immediately in development
3. Test all links to ensure they work correctly
4. Build and deploy your application

---

**Pro Tip**: You can also change the order of social links by rearranging the objects in the array!
