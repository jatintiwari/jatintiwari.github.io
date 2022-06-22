<script>
  import BlogHeader from './common/blog-header.md';
  import Center from '../js/common/Center.svelte';
  import Image from '../js/common/Image.svelte';
</script>

<BlogHeader date="22 June 2022">
<h1>Create rounded images with <a target="_blank" href="https://imagemagick.org/script/download.php">Imagemagick</a></h1>
</BlogHeader>

#### Create a mask

```shell
convert -size 300x300 xc:none -draw "roundrectangle 0,0,300,300,150,150" mask.png
```

<div align="center">
  <Image height="200" src="https://user-images.githubusercontent.com/10477804/174970872-f986f767-8642-4873-a905-9b692454afdb.png" desc="Masked image will saved to the file system."/>
</div>

#### Apply the mask

```shell
convert original_image.png -matte mask.png \
  -compose DstIn -composite rounded_original_image.png
```

<div align="center">
  <Image height="300" src="https://user-images.githubusercontent.com/10477804/174964643-ed9dfa2f-106b-4fed-8a01-874dd38668a5.png" desc="Above created mask will be used as frame to crop extra part of original image. This image will be the size of original image and that is why the above image is pushing this down."/>
</div>

#### Crop the Image

```shell
convert rounded_original_image.png -crop 300x300 rounded_original_image.png
```

<div align="center">
  <Image height="220" src="https://user-images.githubusercontent.com/10477804/175003161-0d5a4926-c371-40d2-aa4e-3d7803108067.png" />
</div>

#### Good to have

-   Size of the original image should be enough to create rounded borders
-   Focus content of the image ideally should be in center of image as the edges will be cropped.
