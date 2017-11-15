import sys
from PIL import Image

workdir = "."
x_max = 256.0

def main(argv):
	for arg in argv:
		print "Opening:", arg
		try:
			img = Image.open(workdir+arg)
			ratio = x_max/float(img.size[0])
			new_size = x_max, int(float(img.size[1])*ratio)
			img.thumbnail(new_size, Image.ANTIALIAS)
			img.save(workdir+"thumbnails/"+arg,"JPEG")
			print "Created thumbnail for", arg
		except IOError:
			print "Failed to open", arg

if __name__ == "__main__":
	workdir = sys.argv[1]
	main(sys.argv[2:])