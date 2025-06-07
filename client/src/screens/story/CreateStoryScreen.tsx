import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CreateStoryScreen() {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [selectedAgeRange, setSelectedAgeRange] = useState('3-5');
  const [storyTitle, setStoryTitle] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [storyType, setStoryType] = useState('Düz Masal');

  return (
    <View style={{ flex: 1, backgroundColor: '#FFEFD5', paddingTop: 60, paddingHorizontal: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#444' }}>Masal Oluştur</Text>
        <TouchableOpacity onPress={() => setSettingsVisible(true)}>
          <Ionicons name="settings-outline" size={28} color="#444" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 18, color: '#555', marginBottom: 10 }}>Masal Başlığı</Text>
        <TextInput
          placeholder="Bir başlık yazın..."
          value={storyTitle}
          onChangeText={setStoryTitle}
          style={{
            backgroundColor: '#fff',
            padding: 15,
            borderRadius: 12,
            fontSize: 16,
            marginBottom: 20,
          }}
        />

        <Text style={{ fontSize: 18, color: '#555', marginBottom: 10 }}>Karakter İsmi</Text>
        <TextInput
          placeholder="Bir karakter ismi yazın..."
          value={characterName}
          onChangeText={setCharacterName}
          style={{
            backgroundColor: '#fff',
            padding: 15,
            borderRadius: 12,
            fontSize: 16,
            marginBottom: 20,
          }}
        />

        <Text style={{ fontSize: 18, color: '#555', marginBottom: 10 }}>Masal Türü</Text>
        <TouchableOpacity
          onPress={() => setStoryType(storyType === 'Düz Masal' ? 'Etkileşimli Masal' : 'Düz Masal')}
          style={{
            backgroundColor: '#fff',
            padding: 15,
            borderRadius: 12,
            alignItems: 'center',
            marginBottom: 30,
          }}
        >
          <Text style={{ fontSize: 16, color: '#444' }}>{storyType}</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          console.log('Masal Oluşturuldu:', { storyTitle, characterName, storyType, selectedAgeRange });
        }}
        style={{
          backgroundColor: '#FF69B4',
          padding: 18,
          borderRadius: 16,
          alignItems: 'center',
          marginBottom: 30,
        }}
      >
        <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Masal Oluştur</Text>
      </TouchableOpacity>

      <Modal visible={settingsVisible} animationType="slide" transparent>
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 20,
            padding: 25,
            width: '80%',
          }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>Ayarlar</Text>

            <Text style={{ fontSize: 16, marginBottom: 10 }}>Yaş Aralığı</Text>
            {['3-5', '6-8', '9-12'].map(range => (
              <TouchableOpacity
                key={range}
                onPress={() => setSelectedAgeRange(range)}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: selectedAgeRange === range ? '#FF69B4' : '#eee',
                  marginBottom: 10,
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontSize: 16, color: selectedAgeRange === range ? '#fff' : '#444' }}>{range} yaş</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => setSettingsVisible(false)}
              style={{
                backgroundColor: '#FF69B4',
                padding: 15,
                borderRadius: 12,
                alignItems: 'center',
                marginTop: 20,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}