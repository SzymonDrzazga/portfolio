#include <iostream>
#include <vector>
#include <fstream>
#include <string>

std::string encryption(int, std::string);
std::string decryption(int, std::string);


int main()
{
	//Loading files
	//{
	std::fstream data_1;
	data_1.open("dane/dane_1.txt", std::ios::in);
	std::fstream wyniki_1;
	wyniki_1.open("wyniki/wyniki_1.txt", std::ios::out);

	std::fstream data_2;
	data_2.open("dane/dane_2.txt", std::ios::in);
	std::fstream wyniki_2;
	wyniki_2.open("wyniki/wyniki_2.txt", std::ios::out);

	std::fstream data_3;
	data_3.open("dane/dane_3.txt", std::ios::in);
	std::fstream wyniki_3;
	wyniki_3.open("wyniki/wyniki_3.txt", std::ios::out);
	//}




	//Zadanie 0
#if 0
	{
		while (!data_1.eof())
		{
			std::string line;

			data_1 >> line;
			std::string wynik_do_1 = encryption(107, line);
			wyniki_1 << wynik_do_1 << std::endl;
		}
	}
#endif



	//Zadanie 1
#if 0
	{
		while (!data_2.eof())
		{
			std::string line_2;
			int key_2;

			data_2 >> line_2 >> key_2;
			std::string wynik_do_2 = decryption(key_2, line_2);
			wyniki_2 << wynik_do_2 << std::endl;
		}
	}
#endif



	//Zadanie 2
#if 0
	{
		while (!data_3.eof())
		{
			std::string line_3;
			int key_3;

			data_2 >> line_2 >> key_3;
			std::string wynik_do_2 = decryption(key_3, line_2);
			wyniki_2 << wynik_do_2 << std::endl;
		}
	}
#endif



}


std::string encryption(int k, std::string tabela)
{
	int better_k = k % 26;
	int number, h;
	for (size_t i = 0; i < tabela.size(); i++)
	{
		number = tabela[i];

		if (number + better_k > 90)
		{
			h = (number + better_k) - 90;
			number = 65 + h;
		}
		else
		{
			number = number + better_k;
		}
		tabela[i] = number;
	}
	return tabela;
}

std::string decryption(int k, std::string tabela)
{
	int better_k = k % 26;
	int number;
	for (size_t i = 0; i < tabela.size(); i++)
	{
		number = tabela[i];

		if (number - better_k < 65)
		{
			number = (number - better_k) + 26;
		}
		else
		{
			number = number - better_k;
		}
		tabela[i] = number;
	}
	return tabela;
}