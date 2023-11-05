import { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import {
  Box, Button, Card,
  CardContent, Modal, TextField,
  Typography, Zoom
} from '@mui/material';

const Upload = () => {
  const [addedData, setAddedData] = useState([]);
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const maxNumber = 20;

  const onChange = (imageList) => {
    setAddedData(imageList)
  };

  const handleToggle = () => {
    setIsOpen(prev => !prev)
  };

  console.log("Data: ", addedData)

  return (
    <Box className="w-full flex flex-col justify-between items-center gap-16">
      <Button variant='contained' onClick={handleToggle}>
        Open modal
      </Button>
      <Modal
        open={isOpen}
        onClose={handleToggle}
        className='flex items-center justify-center text-center'
      >
        <Zoom in={isOpen}>
          <Card sx={{ maxWidth: 600, borderRadius: "20px" }}>
            <CardContent>
              <Typography
                noWrap
                fontSize={25}
                textAlign="center"
                fontFamily="Raleway"
                marginY={1}
                letterSpacing={2}
              >
                Upload your image
              </Typography>
              <ImageUploading
                value={addedData}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  <>
                    <Box className={`flex justify-center items-center flex-wrap gap-2.5`}>
                      <Button
                        style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Click or Drop here
                      </Button>
                    </Box>
                    <Box className="flex overflow-y-auto h-72 gap-6 pl-6">
                      {imageList.map((image, i) => (
                        <Box key={i} className="flex items-center gap-1">
                          <Box className='cursor-grabbing'>
                            <img src={image['data_url']} alt="img list" width="150" />
                            <span className='text-xl tracking-wider font-[Raleway] text-'>{text}</span>
                            <Box className="flex items-center justify-center">
                              <Button variant='text' onClick={() => onImageUpdate(i)}>Update</Button>
                              <Button variant='text' onClick={() => onImageRemove(i)}>Remove</Button>
                            </Box>
                          </Box>
                          <Box className='flex flex-col justify-center items-center gap-6'>
                            <TextField
                              className='w-[90%]'
                              value={text}
                              variant="filled"
                              label="Add description"
                              placeholder="Some beautiful text"
                              onChange={(e) => setText(e.target.value)}
                            />
                            <Button
                              onClick={() => {
                                text.trim() && setImages([...images, {
                                  id: Math.random(),
                                  title: text,
                                  image: image['data_url']
                                }])
                                setText('')
                                onImageRemove(i)
                                handleToggle()
                              }}
                              variant="contained"
                              sx={{ paddingX: 3 }} >
                              Add
                            </Button>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </>
                )}
              </ImageUploading>
            </CardContent>
          </Card>
        </Zoom>
      </Modal>
      <Box className="flex flex-wrap gap-5 justify-evenly w-full px-4">
        {images.map(({ id, title, image }) => (
          <Box className='bg-[rgba(0,0,0,0.22)] text-center rounded-2xl' key={id}>
            <img src={image} alt={title} width="150" />
            <Button sx={{ color: "white" }} variant='text'>{title}</Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}


export default Upload