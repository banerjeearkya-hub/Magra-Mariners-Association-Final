import React from 'react';
import { motion } from 'framer-motion';
import { Form, Input, Button, message } from 'antd';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const Contact = ({ data }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Contact form submitted:', values);
    message.success({
      content: 'Thank you for reaching out! The Mariners will get back to you shortly.',
      style: {
        marginTop: '10vh',
      },
    });
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Please fill in all required fields correctly.');
  };

  return (
    <section id="contact" className="contact-section section-padding">
      <div className="section-header">
        <h2>{data.title}</h2>
        <p>{data.subtitle}</p>
      </div>

      <div className="contact-container">
        
        {/* Left Side: Info & Map */}
        <motion.div 
          className="contact-info-block"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="contact-details glassmorphism premium-border-maroon">
            <div className="contact-item">
              <div className="contact-icon maroon-bg"><FaMapMarkerAlt /></div>
              <div className="contact-text">
                <h4>Club Address</h4>
                <p>{data.address}</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon green-bg"><FaPhoneAlt /></div>
              <div className="contact-text">
                <h4>Phone Number</h4>
                <p>{data.phone}</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon maroon-bg"><FaEnvelope /></div>
              <div className="contact-text">
                <h4>Email Address</h4>
                <p>{data.email}</p>
              </div>
            </div>
          </div>

          {/* Map wrapper */}
          <div className="contact-map glassmorphism">
            <iframe 
              src={data.googleMapEmbed} 
              width="100%" 
              height="250" 
              style={{ border: 0, borderRadius: '12px' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="MMA Location Map"
            />
          </div>
        </motion.div>

        {/* Right Side: Ant Design Form */}
        <motion.div 
          className="contact-form-block glassmorphism premium-border-green"
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h3>Send Us A Message</h3>
          <div className="form-divider"></div>
          
          <Form
            form={form}
            name="contact_form"
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="custom-form"
          >
            <Form.Item
              label="Your Full Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input placeholder="Enter your full name" size="large" />
            </Form.Item>

            <Form.Item
              label="Your Email Address"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email address' }
              ]}
            >
              <Input placeholder="Enter your email address" size="large" />
            </Form.Item>

            <Form.Item
              label="Subject"
              name="subject"
              rules={[{ required: true, message: 'Please enter a subject' }]}
            >
              <Input placeholder="What is this regarding?" size="large" />
            </Form.Item>

            <Form.Item
              label="Message Details"
              name="message"
              rules={[{ required: true, message: 'Please write your message' }]}
            >
              <Input.TextArea rows={4} placeholder="Type your message here..." />
            </Form.Item>

            <Form.Item className="submit-form-item">
              <Button 
                type="primary" 
                htmlType="submit" 
                className="btn-primary form-submit-btn"
                icon={<FaPaperPlane />}
                size="large"
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
